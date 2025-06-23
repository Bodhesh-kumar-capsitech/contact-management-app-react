import type React from "react";

interface Blueprint
{
    name:string;
    age:number;
}

const Doc: React.FC<Blueprint> = ({name,age}) => {
  return (
    <>
    <div className="text-amber-600">document</div>
    <p>Hello {name}, my age is {age}</p>
    </>
  )
}

export default Doc;