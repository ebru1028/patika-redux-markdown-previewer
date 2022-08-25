import { useEffect } from 'react'
import Header from './Header'
import ReactMarkDown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useSelector, useDispatch } from 'react-redux';
import { isClicked, textHelp, changeUserText, userText } from '../redux/markdownPreviewer/markdownSlice';

function Content() {
    const dispatch = useDispatch();
    const clicked = useSelector(isClicked)
    const helpText = useSelector(textHelp);
    const textUser = useSelector(userText);

    useEffect(() => {
      const textarea = document.getElementById('textarea');
      if(clicked === true) {
        textarea.disabled = true;
      } else {
        textarea.disabled = false;
      }
    }, [clicked])

    return (
        <>
        <Header />
        <div className="content">
            <textarea 
                id="textarea"
                className="content__box" 
                value={`${clicked ? helpText : textUser}`}
                onChange={(e) => dispatch(changeUserText(e.target.value))}
            />

            <ReactMarkDown 
                id='reactMarkDown'
                className="content__box" 
                children={`${clicked ? helpText : textUser}`}
                components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={docco}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
            />
        </div>
        </>
    )
}

export default Content;