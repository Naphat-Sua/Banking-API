import BankThai from "../admin/bank/BankThai";

const Result = []

for (const x in BankThai.th) {
    Result.push(x.toLocaleUpperCase())
}

Result.push('TTB')

export default Result
