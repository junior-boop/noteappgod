import { NodeViewWrapper } from '@tiptap/react';
import { useEffect, useState } from 'react';
import filtre from './livre';

type FilterProps = {
    chapitre: string;
    vers: {
        n: number;
        v: string;
    }[];
    versChar: string;
    reference: string;
}

export default function BibleVerset({ node }: { node: { attrs: { entry: string } } }) {
    const [content, setContent] = useState<FilterProps | null>(null)

    useEffect(() => {
        const check = /[;:\-v]/g
        const replace = node.attrs.entry.replace(RegExp(check), ' ')
        const spliter = replace.split(RegExp(/\s+/g))


        const verset = filtre({ livre: spliter[0], chap: spliter[1], vers1: spliter[2], vers2: spliter[3] })
        if (verset !== undefined) setContent(verset)

    }, [node.attrs.entry])

    return (
        <NodeViewWrapper className=" h-auto w-full bg-red-50">
            <div className='px-4 pt-3 pb-1'>
                <span className='text-xl font-semibold text-red-800 '>{content?.reference}</span>
            </div>
            <div className='px-4 pb-3'>
                {
                    content?.vers.map((el) => (<span className='text-xl' key={el.n}><span className='inline-block p-1 text-base font-bold'>{el.n}</span>{el.v}</span>))
                }
            </div>
        </NodeViewWrapper>

    )
}