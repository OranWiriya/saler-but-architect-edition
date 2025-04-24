import { ResponseDataTransformedType } from '../apis/type';

const ResultDisplay = ({
  response,
  displayData,
}: {
  response: ResponseDataTransformedType;
  displayData: string;
}) => {
  return (
    <div className="resultWrapper">
      <div className="bounce-in display-data" key={displayData}>
        {displayData}
      </div>

      {response.whole_reason.map((item, index) => (
        <div className="result-list result-text" key={index + item.reason}>
          {item.reason}
          <span className="result-list-multi">X {item.multi}</span>
        </div>
      ))}
    </div>
  );
};

export default ResultDisplay;
