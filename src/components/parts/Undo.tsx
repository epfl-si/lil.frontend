import {RotateCcw} from "lucide-react";

export const Undo = ({ title, undoDeletion, isIcon}: {
  title: string,
  undoDeletion: () => void,
  isIcon: boolean
}) => {

  return (
    <div className="left-div" style={{color: "red", margin: "10px"}}>
      <span title={title}>
        <RotateCcw onClick={undoDeletion}/>
      </span>
      {isIcon ? '' : title}
    </div>
  );
};
