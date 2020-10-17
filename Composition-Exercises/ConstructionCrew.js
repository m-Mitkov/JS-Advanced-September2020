function solve(input) {
    let { weight, experience, levelOfHydrated, dizziness } = input;

    let worker = {
        weight, 
        experience,
        levelOfHydrated, 
        dizziness,
    }

   if (worker.dizziness) {
       worker.levelOfHydrated += (worker.weight * 0.1) * worker.experience;
       worker.dizziness = false;
   }

   return worker;
}

solve(
    {
        weight: 120,
        experience: 20,
        levelOfHydrated: 200,
        dizziness: true
    });