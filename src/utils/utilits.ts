export const BACKEND_ORIGIN = 'http://localhost:8000';

// TODO revisit this, make it fool-proof
export const areTwoObjectsTheSame = (obj1: object, obj2: object) => {
    if (Object.keys(obj1).length !==  Object.keys(obj2).length) {
        return false;
    }

    if (Object.values(obj1).filter(Boolean).length !==  Object.values(obj2).filter(Boolean).length) {
        return false;
    }

    const resultArr = Object.keys(obj1).map((item: string) => {
        return obj1[item as keyof typeof obj1] === obj2[item as keyof typeof obj2];
    }).filter(Boolean);

    return resultArr.length === Object.values(obj1).length;
}