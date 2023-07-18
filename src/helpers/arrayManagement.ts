export const deleteElement = (element: string, array: any) => {
  const index = array.indexOf(element);
  array.splice(index, 1);
  return array;
};

export const deleteUsersFromAudiences = async (
  audienceIdsArray: { id: string }[],
  dto: { userId: string },
  audienceService: any,
) => {
  if (audienceIdsArray) {
    for (let i = 0; i < audienceIdsArray.length; i = i + 1) {
      let audienceId = audienceIdsArray[i].id;
      const userId = dto.userId;
      await audienceService.deleteUser({
        userId: userId,
        audienceId: audienceId,
      });
    }
  }
};