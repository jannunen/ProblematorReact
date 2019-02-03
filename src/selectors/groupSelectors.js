import { createSelector } from 'reselect'

const groupToFind = (state) => state.groups.groupToFind
const getGroups = (state) => state.groups.groups

export const findGroup = createSelector(
  [ groupToFind, getGroups ],
  (groupToFind, groups) => {
      console.log(groupToFind,"selecting from",groups);
      return  groups.filter(item => item.gid === groupToFind)
  }
)