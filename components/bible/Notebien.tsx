import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'

export default () => {
    return (
        <NodeViewWrapper className="py-3 bg-blue-50 my-2">
            <NodeViewContent className="px-3 border-l-4 border-blue-600" />
        </NodeViewWrapper>
    )
}