const payload = { problemid : 47248, tickid : 530853};
let newState =  {
    ...state,
    probleminfos : {
        ...state.probleminfos,
        [payload.problemid] : [...state.probleminfos[payload.problemid]].myticklist.filter((x,idx) => payload.tickid !== idx)
    }
}