export const validateId = (id) => {
    console.log("ID.LENGTH: ", id)
    if (!isNaN(id)) {
        return true

    } else { false };
}
export const validateBody = (body, comparator = "AND") => {
    if (comparator === "AND") {
        if (body.name && body.strength && body.defense && body.weaknessess) {
            if (body.name.length > 3 && typeof body.strength === "number" && typeof body.defense === "number" && body.weaknesses.length > 0) {
                return true;
            }
        }
        return false
    };
    if (comparator === "OR") {
        if (body.name || body.strength || body.defense || body.weaknesses) {
            return true
        }
    }
    return false;
}