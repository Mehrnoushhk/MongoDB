db.solarSystem.aggregate([
    {
        "$match": {
            "atmosphericComposition": { "$in": [/O2/] },
            "meanTemperature": {"$gte" : -40, "$lte": 40}
        }
    },
    {
        "$project": {
            "_id": 0,
            "name": 1,
            "hasMoons": {"$gt": ["numberOfMoons", 0]}
        }
    },
], { "allowDiskUse": true })

// ***********************************************************
// ***********************************************************
db.solarSystem.aggregate([
    {
        $match: {
            type: {$ne: "Star"}
        }
    },
    {
        $count: "planets"
    }
])

// ***********************************************************
// ***********************************************************

db.solarSystem.aggregate([
    {
        $project: {
            _id : 0, name: 1, "gravity.value": 1
        }
    }
])

db.solarSystem.aggregate([
    {
        $project: {
            _id: 0, name: 1, surfaceGravity: "$gravity.value",
            myWeight: { $multiply: [95, {$divide: ["$gravity.value", 9.8]}]}
        }
    }
])

// *************** CHAPTER 1 - LAB - $match ************
// *****************************************************

var pipline = [
    {
        $match: {
            "imdb.rating": { $gte: 7 },
            $or: [{ rated: "PG" }, { rated: "G" }],
            languages: { $all: ["English", "Japanese"] },
            genres: {$nin: ["Horror", "Crime"]}
        }
    }
]
// geners: {$nin: ["Horror", "Crime"]}
// $and: [{geners: {$ne: "Crime"}}, {geners: {$ne: "Horror"}}]

// *************** CHAPTER 1 - LAB - $project **********
// *****************************************************

var pipline = [
    {
        $match: {
            "imdb.rating": { $gte: 7 },
            $or: [{ rated: "PG" }, { rated: "G" }],
            languages: { $all: ["English", "Japanese"] },
            genres: {$nin: ["Horror", "Crime"]}
        }
    },
    {
        $project: {
            _id: 0,
            title: 1,
            rated: 1
        }
    }
]

// *************** CHAPTER 1 - LAB - Computing Fileds  **********
// **************************************************************

var pipline = [
    {
        $project: {
            titleSplit: {$split: ["$title", " "]}
        }
    },
    {
        $match: {
            titleSplit: {$size: 1}
        }
    }
]


// ******** CHAPTER 1 - Optional Lab - Expressions with $project **********
// ************************************************************************

var pipeline = [
    {
        $match: {
            writers: { $elemMatch: { $exists: true } }
        }

    },
    {
        $project: {
            title: 1,
            _id: 0,
            writers_strip: {
                $map: {
                    input: "$writers",
                    as: "writer",
                    in: {
                        $arrayElemAt: [
                            {
                                $split: ["$$writer", " ("]
                            },
                            0
                        ]
                    }
                }
            },
            cast_strip: {
                $map: {
                    input: "$cast",
                    as: "player",
                    in: {
                        $arrayElemAt: [
                            {
                                $split: ["$$player", " ("]
                            },
                            0
                        ]
                    }
                }
            },
            directors_strip: {
                $map: {
                    input: "$directors",
                    as: "director",
                    in: {
                        $arrayElemAt: [
                            {
                                $split: ["$$director", " ("]
                            },
                            0
                        ]
                    }
                }
            },
            commonToAll: {
                $setIntersection: ["$writers_strip", "$cast_strip", "$directors_strip"]
            }
        }
    }
]

// {
    // $match: { commonToAll: { $elemMatch: { $exists: true } } }
// }

// *************** CHAPTER 2 - $addFields ************************************
// ***************************************************************************

