import type { IModel, INode, NodeData, NodeKey, Op } from '@editablejs/model'
import type { ISelection } from '@editablejs/selection';
import type { IEventEmitter } from '@editablejs/event-emitter';
import type { ITyping } from './typing/types';

export interface RenderOptions<E extends NodeData = NodeData, T extends INode<E> = INode<E>> {
  node: T
  next: (node: INode) => any
  editor: IEditor
}

export type PluginRender <E extends NodeData = NodeData, T extends INode<E> = INode<E>> = (options: RenderOptions<E, T>) => any

export interface PluginOptions<E extends NodeData = NodeData, T extends INode<E> = INode<E>> {
  render: PluginRender<E, T>
  isBlock?: (node: INode) => boolean
  isInline?: (node: INode) => boolean
  isVoid?: (node: INode) => boolean
}

export interface EditorOptions {
  enabledPlugins?: string[]
  disabledPlugins?: string[]
}

export interface IEditor extends IEventEmitter {

  model: IModel

  selection: ISelection

  typing: ITyping
  
  registerPlugin<E extends NodeData = NodeData, T extends INode<E> = INode<E>>(type: string, options: PluginOptions<E, T> | PluginRender<E, T>): void;

  renderPlugin<E extends NodeData = NodeData, T extends INode<E> = INode<E>>(node: T): any

  onUpdate<E extends NodeData = NodeData, T extends INode<E> = INode<E>>(key: NodeKey, callback: (node: T, ops: Op[]) => void): void

  offUpdate(key: NodeKey): void

  emitUpdate<E extends NodeData = NodeData, T extends INode<E> = INode<E>>(node: T, ops: Op[]): void

  didUpdate(node: INode, ops: Op[]): void

  deleteBackward(): void

  deleteForward(): void

  insertText(text: string): void;

  insertNode(node: INode): void

  destroy(): void
}