

interface SeedData{
    entries: SeedEntry[];
}

interface SeedEntry{
    description: string;
    status: string;
    createdAt: number; 
}   




export const seedData: SeedData = {
    entries: [
        {
            description:'Pending: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo veniam magni debitis animi! Ducimus, ',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description:'In Progress: ariatur reprehenderit quo veritatis adipisci nulla totam quod distinctio eveniet impedit ex atque cumque dignissimos possimus?',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description:' Finished: Nemo veniam magni debitis animi! Ducimus, pariatur reprehenderit quo veritatis adipisci nulla totam quod distinctio eveniet impedit ex atque cumque dignissimos possimus?',
            status: 'finished',
            createdAt: Date.now() - 100000,
        }
    ]
}