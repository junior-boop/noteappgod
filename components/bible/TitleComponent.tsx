import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'

export default () => {
    return (
        <NodeViewWrapper>
            <NodeViewContent className="text-4xl font-bold mb-5 title" />
        </NodeViewWrapper>
    )
}