export const validateId = (id) => {
    if (!isNaN(id) && id.length > 0) {
        return true

    } else { false };
}
export const validateBody = (body, comparator = "AND") => {
    if (comparator === "AND") {
        if (body.name && body.strength && body.defense && body.weaknesses && body.abilities) {
            if (body.name.length > 3 && typeof body.strength === "number" && typeof body.defense === "number" && body.weaknesses.length > 0 && body.abilities.length > 0) {
                return true;
            }
        }
        return false
    };
    if (comparator === "OR") {
        if (body.name || body.strength || body.defense || body.weaknesses || body.abilities) {
            return true
        }
    }
    return false;
}