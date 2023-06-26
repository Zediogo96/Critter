

export const formatDate = (date: string) => {

    const dateObj = new Date(date);
    const nameOfMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(dateObj);
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${nameOfMonth} ${day}, ${year}`;
}