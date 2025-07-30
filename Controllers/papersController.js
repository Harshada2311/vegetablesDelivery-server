const papersList = require('../models/Papers.json');

exports.getAllPapers = (req, res) => {
    res.status(200).json(papersList);
    console.log(papersList);
}

exports.getAllPapersByID = (req, res) => {
    const paperID = req.params.id;
    const paper = papersList.find(p => p.id == paperID);

    if (paper) {
        res.status(200).json({
            filterID: paper
        });

    }
    else {
        res.status(400).json({
            message: "paper not found"
        });
    }
}

exports.getAllPapersByName = (req, res) => {
    const paperName = req.params.name;
    const papers = papersList.filter(p => p.papername == paperName);
    if (papers.length > 0) {
        res.status(200).json({ filterPapers: papers });
    }
    else {
        res.status(404).json({ message: "No papers found with that name" });
    }
}

exports.GetAllPapersByCharges = (req, res) => {
    const paperCharges = parseInt(req.params.charge, 10);

    const papers = papersList.filter(p =>
        p.charges.some(c => c.charge === paperCharges)
    );
    if (papers.length > 0) {
        res.status(200).json({
            filtercharges: papers
        })
    }

    else {
        res.status(400).json({
            message: "No papers found with that charges"
        });
    }

}
exports.getPaperChargesByID = (req, res) => {
    const paperID = parseInt(req.params.id, 10);
    // if (isNaN(paperID)) {
    //     return res.status(400).json({message: "Invalid paper ID"});
    // }

    const paper = papersList.find(p => p.id === paperID);

    if (paper) {
        res.status(200).json({ charges: paper.charges });
    } else {
        res.status(400).json({ message: "Paper not found" });
    }
}

exports.getPaperChargesByName = (req, res) => {
    const paperName = req.params.name;
    const papers = papersList.find(p => p.papername == paperName);
    if (papers) {

        res.status(200).json({ charges: papers.charges });
    }
    else {
        res.status(400).json({
            message: "Paper not found"
        })
    }
    /*or i can use filter insted of find but with filter i need to use map to again filter the array 
  because filter gives me array and find gives me single object
  
  if (papers.length > 0) {
  const chargesList = papers.map(p => p.charges);
  res.status(200).json({ charges: chargesList });
  }*/
}
