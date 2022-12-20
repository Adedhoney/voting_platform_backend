const db = require("../../models")
const bcrypt = require("bcrypt")

const readXlsxFile = require("read-excel-file/node")
const excel = require("exceljs")

const addPosition = async (req, res) => {
    try {
        let positionExists = await db.position.findOne({
            where: { position_name: req.body.positionName },
        })
        if (positionExists) {
            return res.status(510).json({ message: "Position Already Added" })
        }
        await db.position.create({
            position_name: req.body.positionName,
        })
        return res.status(201).json({ message: "Position Added successfully" })
    } catch (error) {
        return res
            .status(501)
            .json({ message: "Error occured when adding position" })
    }
}

const addCandidate = async (req, res) => {
    try {
        console.log(1)
        let candidateExists = await db.candidate.findOne({
            where: { candidate_matric: req.body.candidateMatric },
        })
        console.log(2)
        if (candidateExists) {
            return res.status(410).json({ message: "Candidate Already Added" })
        }
        await db.candidate.create({
            candidate_matric: req.body.candidateMatric,
            candidate_name: req.body.candidateName,
            candidate_department: req.body.candidateDepartment,
            candidate_level: req.body.candidateLevel,
            running_position: req.body.runningPosition,
            picture: req.body.picture,
        })
        return res.status(201).json({ message: "Candidate Added successfully" })
    } catch (error) {
        return res
            .status(501)
            .json({ message: "Error occured when adding candidate" })
    }
}

const uploadUsers = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!")
        }
        let path = __dirname + "/../../uploadedFiles/" + req.file.filename
        let rows = await readXlsxFile(path)
        // skip headers
        rows.shift()

        const saveToDB = async (users) => {
            try {
                await db.user.bulkCreate(users)

                return res.status(201).json({ message: "Upload successful" })
            } catch {
                return res
                    .status(501)
                    .json({ message: "Failed to add to database" })
            }
        }

        // create user json
        const userJson = async (rows) => {
            let userJsons = []
            for (let row of rows) {
                let hashedPassword = await bcrypt.hash(row[5].toString(), 10)
                let userInfo = {
                    user_id: row[0],
                    user_name: row[1],
                    user_email: row[2],
                    user_department: row[3],
                    user_level: row[4],
                    password: hashedPassword,
                }
                userJsons.push(userInfo)
            }
            return userJsons
        }

        const usersData = await userJson(rows)
        saveToDB(usersData)
    } catch (error) {
        return res.status(501).json({ message: "error while uploading file" })
    }
}

module.exports.uploadUsers = uploadUsers
module.exports.addCandidate = addCandidate
module.exports.addPosition = addPosition
