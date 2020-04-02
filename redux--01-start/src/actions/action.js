export const INC = "INC";
export const DEC = "DEC";
export const INC_BY_VAL = "INC_BY_VAL";
export const DEC_BY_VAL = "DEC_BY_VAL";
export const SAVE_RESULT = "SAVE_RESULT";
export const REMOVE_RESULT = "REMOVE_RESULT";

export const onInc = () => ({ type: INC });
export const onDec = () => ({ type: DEC });
export const onIncByVal = () => ({ type: INC_BY_VAL, payload: { value: 5 } });
export const onDecByVal = () => ({ type: DEC_BY_VAL, payload: { value: 5 } });
export const onStore = () => ({ type: SAVE_RESULT });
export const onDelete = ind => ({
  type: REMOVE_RESULT,
  payload: { value: ind }
});

export default {};