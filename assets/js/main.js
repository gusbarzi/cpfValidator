class Validate {
    constructor(cpfEnv) {

        Object.defineProperty(this, 'cpfClean', {
            get: () => {
                return cpfEnv.replace(/\D+/g, '');
            }
        });
    }

    valid() {
        if(typeof this.cpfClean === 'undefined') return false;
        if(this.cpfClean.length !== 11) return false;
        if(this.isSequence()) return false;
    
        const cpfParcial = this.cpfClean.slice(0, -2);
        const digit01 = this.createDigit(cpfParcial);
        const digit02 = this.createDigit(cpfParcial + digit01);
    
        const newCpf = cpfParcial + digit01 + digit02;
    
        return newCpf === this.cpfClean;        
    }

    createDigit(cpfParcial) {
        const cpfArray = Array.from(cpfParcial)
    
        let regressive = cpfArray.length + 1;
        const total = cpfArray.reduce((ac, val) => {
            ac += (regressive * Number(val));
            regressive--
            return ac;
        }, 0);
    
        const digit = 11 - (total % 11);
        return digit > 9 ? '0' : String(digit);
    }

    isSequence() {
        const sequence = this.cpfClean[0].repeat(this.cpfClean.length);
        return sequence === this.cpfClean;        
    }
}

const cpf = new Validate('070.897.720-03');

if(cpf.valid()) {
    console.log('Cpf válido');
} else {
    console.log('Cpf inválido');
}