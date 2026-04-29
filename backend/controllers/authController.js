import Admin from "../models/Admin.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerAdmin = async (req, res) => {

  try {

    const { name, email, password } = req.body

    const existingAdmin = await Admin.findOne({ email })

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = new Admin({
      name,
      email,
      password: hashedPassword
    })

    await admin.save()

    res.json({ message: "Admin registered successfully" })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}



export const adminLogin = async (req, res) => {

  try {

    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" })
    }

    const match = await bcrypt.compare(password, admin.password)

    if (!match) {
      return res.status(400).json({ message: "Invalid password" })
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}