import { EntityType, ITechnologyData, MaturityLevels } from "../_lib/types";

export default function ImplementationColumn({
  technologyData,
}: {
  technologyData: ITechnologyData;
}) {
  return (
    <div className="flex flex-col xl:flex-row justify-between relative gap-10 mt-8">
      <p className="opacity-50 min-w-[35%]">{technologyData.description}</p>
      <table className="border-separate implementation-column min-w-[60%]">
        {/* <caption className="mb-2">Maturity</caption> */}
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
                <td className="opacity-50 p-4 border-2 border-slate-600 font-light rounded-r-xl backdrop-blur-xl">
                  {technologyData[level].description}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
