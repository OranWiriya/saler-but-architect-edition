import { ResponseDataTransformedType } from '../type';

export const counter = ({
  dataRes,
  setResults,
}: {
  dataRes: ResponseDataTransformedType;
  setResults: React.Dispatch<
    React.SetStateAction<{ result: number; solution: string }[]>
  >;
}) => {
  const results: { result: number; solution: string }[] = [];
  let prev = Number(dataRes.Point_start);

  dataRes.whole_reason.forEach((item) => {
    if (item.reason) {
      const result = prev * item.multi;
      results.push({
        result: result,
        solution: `${Number(prev).toLocaleString()} x ${item.multi}`,
      });
      prev = result;
    }
  });
  setResults(results);
};
