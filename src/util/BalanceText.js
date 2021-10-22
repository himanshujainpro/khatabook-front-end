class BalanceText{
    handleTType(bal) {
        if (bal > 0) {
            return "You will give";
        } else if(bal<0) {
            return "You will get";
        }
    }

    handleTTypeColor(bal) {
        if (bal > 0) {
            return "text-danger fw-bold";
        } else if(bal<0) {
            return "text-success fw-bold";
        } else{
            return "text-primary fw-bold"
        }
    }

    handleBalColor(bal) {
        if (bal > 0) {
            return "text-danger fw-bold";
        } else if(bal<0) {
            return "text-success fw-bold";
        } else{
            return "text-primary fw-bold"
        }
    }
}

export default new BalanceText();