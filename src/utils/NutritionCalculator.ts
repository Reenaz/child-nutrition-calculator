import CalculationError from './CalculationError';


export const useZaytseva = (weight: number, birthDay: number): number => {
    return  Math.round((weight * 0.02) * birthDay);
};

// The method calculates a recommended dosage by formula Dr. Finkelstein
export const useFinkelstein = (weight: number, birthDay: number): number | never =>  {
    if (weight < 3200) {
        return Math.round(birthDay * 70);
    }
    if (weight >= 3200) {
        return Math.round(birthDay * 80);
    }
    throw new CalculationError("К сожалению, мы не можем Вам ничего порекомендовать.");
};

// The method calculates a recommended dosage by formula Dr. Geibner and Dr. Cherni
export const useGeibnerCherni = (weight: number, birthDay: number): number => {
    if (birthDay <= 60) {
        return Math.round(weight * 0.2);
    }
    else if (birthDay > 60 && birthDay <= 120) {
        return Math.round(weight * 0.165);
    }
    else if (birthDay > 120 && birthDay <= 180) {
        return Math.round(weight * 0.14);
    }
    else {
        return 1000;
    }
};

// The method calculates a recommended dosage by formula Dr. Maslov
export const useMaslov = (weight: number, birthDay: number): number | never => {
    if (birthDay <= 90) {
        return Math.round(weight * 0.12);
    }
    if (birthDay > 90 && birthDay <= 180) {
        return Math.round(weight * 0.115);
    }
    if (birthDay > 180 && birthDay <= 270) {
        return Math.round(weight * 0.11);
    }
    if (birthDay > 270 && birthDay <= 366) {
        return Math.round(weight * 0.1);
    }
    throw new CalculationError("К сожалению, мы не можем Вам ничего порекомендовать.");
};

// The method calculates a recommended dosage by special, calorage formula
export const useCalorage = (weight: number, birthDay: number): number | never => {
    switch(birthDay) {
        case 1: {
            return Math.round(Math.round(weight / 1000) * 27.5);
        }
        case 2: {
            return Math.round(Math.round(weight / 1000) * 40);
        }
        case 3: {
            return Math.round(Math.round(weight / 1000) * 50);
        }
        case 4: {
            return Math.round(Math.round(weight / 1000) * 60);
        }
        case 5: {
            return Math.round(Math.round(weight / 1000) * 70);
        }
        case 6: {
            return Math.round(Math.round(weight / 1000) * 80);
        }
        case 10: {
            return Math.round(Math.round(weight / 1000) * 105);
        }
        default: {
            throw new CalculationError("К сожалению, мы не можем Вам ничего порекомендовать.");
        }
    }
};

// The method calculates a recommended, one time dosage by special formula
export const useOneTime = (weight: number, birthDay: number): number => {
    return Math.round(3 * weight * birthDay);
};


