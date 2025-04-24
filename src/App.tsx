import { useEffect, useRef, useState } from 'react';
import './App.css';
import { ResponseDataTransformedType } from './apis/type';
import { counter } from './utils/counter';
import { Footer, InputField, ResultDisplay } from './components';

function App() {
  const resultRef = useRef<HTMLDivElement>(null);

  const [context, setContext] = useState<string>('');
  const [story, setStory] = useState<string>('');
  const [response, setResponse] = useState<ResponseDataTransformedType>({
    Point_start: '',
    whole_reason: [
      {
        multi: 0,
        reason: '',
      },
    ],
  });
  const [results, setResults] = useState<
    { result: number; solution: string }[]
  >([]);
  const [displayData, setDisplayData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ArrayOfTextSalerRange = [
    { value: 10000, text: 'คนปกติ' },
    { value: 50000, text: 'เสล่อละ' },
    { value: 100000, text: 'เสล่อเท่าบ้าน' },
    { value: 250000, text: 'เสล่อแบบนี้ยังมีคนคบอีกหรอ' },
    { value: 500000, text: 'เสล่อกว่านี้ไม่น่ามีแล้วนะ' },
    { value: 1000000, text: 'เสล่อเรียกพ่อแล้ว พ่อคุณเสล่อ' },
    { value: 5000000, text: 'สุดยอดไปเลย คุณคือที่สุดของความเสล่อ' },
  ];

  useEffect(() => {
    counter({
      dataRes: response,
      setResults,
    });
  }, [response]);

  useEffect(() => {
    if (results.length === 0) {
      setDisplayData('');
      return;
    }

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < results.length - 1 && results[idx].result) {
        setDisplayData(results[idx].solution.toLocaleString());
        idx++;
      } else if (idx === results.length - 1) {
        setDisplayData(Number(results[idx].result).toLocaleString());
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [results]);

  useEffect(() => {
    if (!isLoading && results.length > 0) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading, results]);

  const answerSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + '/api/submit',
        {
          method: 'POST',
          body: JSON.stringify({ context, story }),
        }
      );
      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);
      console.log('Success:', data);
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="containerCustom">
        <div className="header">
          <div>สะเหล่อ.app</div>
          <div>Architect Version</div>
        </div>
        <form onSubmit={answerSubmit}>
          <div className="content">
            <InputField
              label="Context"
              value={context}
              onChange={setContext}
              placeholder="การไปงานเลี้ยง"
            />
            <InputField
              label="Action"
              value={story}
              onChange={setStory}
              placeholder="ลองทักทายคนแปลกหน้า"
            />

            <button
              type="submit"
              className="buttonBtn btn-color"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Calculate'}
            </button>
          </div>
        </form>
        {results.length > 0 && (
          <div ref={resultRef}>
            {displayData &&
              Math.round(Number(displayData.replace(/,/g, ''))) ===
                Math.round(Number(results[results.length - 1]?.result)) && (
                <div
                  className="bounce-in display-text"
                  key={displayData + 'text'}
                >
                  {
                    ArrayOfTextSalerRange.filter(
                      (item) =>
                        Number(results[results.length - 1]?.result) >=
                        item.value
                    ).sort((a, b) => b.value - a.value)[0]?.text
                  }
                </div>
              )}
            {response.whole_reason.length > 1 &&
              ResultDisplay({
                response,
                displayData,
              })}
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
