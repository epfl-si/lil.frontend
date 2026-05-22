import {RotateCcw} from "lucide-react";

export const Undo = ({ title, undoDeletion, isIcon, disabled}: {
  title: string,
  undoDeletion: () => void,
  isIcon: boolean,
  disabled?: boolean
}) => {

  return (
    <div style={{color: disabled ? "gray" : "black"}}>
      <span title={title} className="cursor-pointer">
        <RotateCcw onClick={disabled ? () => {} : undoDeletion}/>
      </span>
      {isIcon ? '' : title}
    </div>
  );
};
