import {RotateCcw} from "lucide-react";

export const Undo = ({ title, undoDeletion, isIcon, disabled}: {
  title: string,
  undoDeletion: () => void,
  isIcon: boolean,
  disabled?: boolean
}) => {

  return (
    <div className="left-div" style={{color: disabled ? "gray" : "black", margin: "10px"}}>
      <span title={title}>
        <RotateCcw onClick={disabled ? () => {} : undoDeletion}/>
      </span>
      {isIcon ? '' : title}
    </div>
  );
};
