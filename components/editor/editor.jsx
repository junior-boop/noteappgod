"use dom";
import EditorJS from '@editorjs/editorjs';
import underline from '@editorjs/underline';
import React, { useEffect, useRef } from 'react';
import bible_ref from './bible_reference/bible-verse.mjs';
import delimiter from './delimiter/delimiter.mjs';
import heading from './header/header.mjs';
import image from './image/image.mjs';
import './index-BTuqySb3.css';
import Link from './link/link.mjs';
import List from './list/list.mjs';
import marker from './marker/marker.mjs';
import Note from './note/note.mjs';
import quote_review from './quote_review/quote_review.mjs';
import titre from './titre/titre.mjs';

const EditorComponent = ({ data, onChange }) => {
  const editorRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    // Initialiser l'éditeur uniquement s'il n'est pas déjà initialisé
    if (!instanceRef.current) {
      instanceRef.current = new EditorJS({
        holder: editorRef.current,
        placeholder: 'je suis dans la place',
        tools: {
          bible_ref: {
            class: bible_ref,
            inlineToolbar: true
          },
          list: {
            class: List,
            inlineToolbar: true
          },
          titre: titre,
          quote_review: quote_review,
          note: {
            class: Note,
            inlineToolbar: true
          },

          image: image,
          heading: {
            class: heading,
            inlineToolbar: true,
            config: {
              placeholder: 'Entrez votre sous-titre',
              levels: [2, 3, 4],
              defaultLevel: 3
            }
          },
          link: Link,
          marker: marker,
          delimiter: delimiter,
          underline: underline
        },
        data: data || {},
        onChange: async () => {
          const savedData = await instanceRef.current.save();
          onChange && onChange(savedData);
        }
      });
    }

    // Nettoyage lors du démontage du composant
    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, []);

  return <div ref={editorRef} className="editor-js-container" />;
};

export default EditorComponent;