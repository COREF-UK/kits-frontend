"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "../_lib/api";
import { Tooltip } from "react-tooltip";

interface StrapiResponse {
  data: any;
}

async function fetchData() {
  try {
    const apiPath = `/glossaries`;
    const urlParamsObject = {
      sort: { id: "asc" },
      populate: "*",
    };

    const responseData = await fetchAPI<StrapiResponse>(
      apiPath,
      urlParamsObject
    );

    return responseData.data;
  } catch (error) {
    console.error(error);
  }
}

export default function GlossaryTooltips() {
  let [data, setData] = useState<any>(null);
  // const data = await fetchData();
  useEffect(() => {
    fetchData().then((res) => setData(res));
  }, []);
  //   console.log(data);

  if (!data) return <div></div>;
  console.log(data);
  return data.map((tooltip: any) => (
    <Tooltip
      key={tooltip.id}
      className="max-w-[300px] z-40 bg-opacity-10 backdrop-blur-sm p-2 rounded-lg"
      id={`glossary-${tooltip.id.toString()}`}
      place="bottom"
      content={tooltip.attributes.content}
      variant="light"
    ></Tooltip>
  ));
}