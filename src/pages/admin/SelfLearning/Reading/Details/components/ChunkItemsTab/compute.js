export const getRate = (itemCount, totalCount) => {
    return totalCount ? Math.round((itemCount/totalCount)*100) : 0;
}
