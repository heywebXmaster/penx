import ky from 'ky'
import {
  decryptByMnemonic,
  encryptByPublicKey,
  getPublicKey,
} from '@penx/mnemonic'
import { INode, ISpace } from '@penx/model-types'

type Response<T> = {
  success: boolean
  data: T
  errorCode: string
  errorMessage: string
}

export class SyncServerClient {
  constructor(
    private space: ISpace,
    private mnemonic: string,
  ) {}

  get baseURL() {
    return this.space.syncServerUrl || ''
  }

  get token() {
    return this.space.syncServerAccessToken || ''
  }

  toRaw = (value: any) => {
    return typeof value === 'object'
      ? value
      : JSON.parse(decryptByMnemonic(value as string, this.mnemonic))
  }

  getAllNodes = async () => {
    if (!this.baseURL) return []

    const url = `${this.baseURL}/getAllNodes`
    const nodes = await ky
      .post(url, {
        json: {
          token: this.token,
          spaceId: this.space.id,
        },
      })
      .json<INode[]>()

    return nodes.map((node) => ({
      ...node,
      element: this.toRaw(node.element as string),
      props: this.toRaw(node.props as any),
      createdAt: new Date(node.createdAt),
      updatedAt: new Date(node.updatedAt),
    }))
  }

  getNodesLastUpdatedAt = async () => {
    const url = `${this.baseURL}/getNodesLastUpdatedAt`
    const res = await ky
      .post(url, {
        json: {
          token: this.token,
          spaceId: this.space.id,
        },
      })
      .json<{ updatedAt: number | null }>()

    return res.updatedAt
  }

  getPullableNodes = async (localLastModifiedTime: number) => {
    const url = `${this.baseURL}/getPullableNodes`
    const nodes = await ky
      .post(url, {
        json: {
          token: this.token,
          spaceId: this.space.id,
          lastModifiedTime: localLastModifiedTime,
        },
      })
      .json<INode[]>()

    return nodes.map((node) => ({
      ...node,
      element: this.toRaw(node.element as string),
      props: this.toRaw(node.props as any),
      createdAt: new Date(node.createdAt),
      updatedAt: new Date(node.updatedAt),
    }))
  }

  pushNodes = async (nodes: INode[]) => {
    console.log('pushNodes..........==.', nodes)

    const { space } = this
    const url = `${this.baseURL}/pushNodes`
    const publicKey = getPublicKey(this.mnemonic)
    const encryptedNodes = nodes.map((node) => ({
      ...node,
      element: encryptByPublicKey(JSON.stringify(node.element), publicKey),
      props: encryptByPublicKey(JSON.stringify(node.props), publicKey),
    }))

    const res = await ky
      .post(url, {
        json: {
          token: this.token,
          spaceId: space.id,
          nodes: encryptedNodes,
        },
      })
      .json<Response<string>>()

    if (res.success)
      return {
        time: res.data,
      }

    if (res.errorCode === 'NODES_BROKEN') {
      throw new Error(res.errorCode)
    }

    throw new Error('UNKNOWN_ERROR')
  }
}
