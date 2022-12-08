import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "PUT") {
    const { firstName, lastName, email, password } = req.body;
    const cookies = cookie.parse(req.headers.cookie || "");
      const access = cookies.access || false;
      
    try {
      const response = await axios.put(
        `${process.env.API_URL}/me/update/`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (response.data) {
        return res.status(200).json({
            success: true,
            user: response.data
        });
      } else {
        return res.status(response.status).json({
          error: "Something went wrong updating your profile.",
        });
      }
    } catch (err) {
     return res.status(500).json({
        error:
          err.response && (err.response.data.detail || err.response.data.error),
      });
    }
  }
};
