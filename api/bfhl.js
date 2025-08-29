export default function handler(req, res) {
  const fullName = "adi_seth";
  const dob = "27082004";
  const email = "adseth19@gmail.com";
  const rollNumber = "22BCE2897";

  function processData(arr) {
    let evens = [];
    let odds = [];
    let alphabets = [];
    let specials = [];
    let sum = 0;
    let letters = [];

    for (let item of arr) {
      if (/^-?\d+$/.test(item)) {
        let num = parseInt(item, 10);
        if (num % 2 === 0) evens.push(item);
        else odds.push(item);
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        letters.push(item);
      } else {
        specials.push(item);
      }
    }

    let concat = letters
      .join("")
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return { evens, odds, alphabets, specials, sum: sum.toString(), concat };
  }

  if (req.method === "POST") {
    try {
      const { data } = req.body;

      if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input" });
      }

      const { evens, odds, alphabets, specials, sum, concat } = processData(data);

      return res.status(200).json({
        is_success: true,
        user_id: `${fullName}_${dob}`,
        email,
        roll_number: rollNumber,
        odd_numbers: odds,
        even_numbers: evens,
        alphabets,
        special_characters: specials,
        sum,
        concat_string: concat,
      });
    } catch (error) {
      return res.status(500).json({ is_success: false, message: "Server error" });
    }
  } else {
    return res.status(405).json({ is_success: false, message: "Method not allowed" });
  }
}
