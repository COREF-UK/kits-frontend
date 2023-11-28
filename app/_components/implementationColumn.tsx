import { EntityType, ITechnologyData, MaturityLevels } from "../_lib/types";
import Markdown from "./markdown";

export default function ImplementationColumn({
  technologyData,
}: {
  technologyData: ITechnologyData;
}) {
  return (
    <div className="flex flex-col xl:flex-row justify-between relative gap-10 mt-4">
      <div className="min-w-[35%]">
        <Markdown source={technologyData.description}></Markdown>
      </div>
      <table className="border-separate implementation-column min-w-[60%]">
        <tbody>
          {MaturityLevels.slice()
            .reverse()
            .map((level, i) => (
              <tr key={level}>
                <td
                  className={`text-lg font-normal rotate-180 w-10 py-4 px-4 vertical-text self-center text-center ${EntityType.slice()
                    .reverse()
                    [i].slice(
                      0,
                      -1
                    )}-cell border-2 border-slate-600 bg-opacity-50`}
                >
                  {level}
                </td>
                <td className="p-4 border-2 border-slate-600 font-light rounded-r-xl backdrop-blur-xl text-base">
                  <Markdown
                    source={technologyData[level].description}
                  ></Markdown>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
