

export const aboutUsController = async (req, res) => {
    try {
        
        res.status(200).render('aboutUs')
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const wordleController = async (req, res) => {
    try {
        
        res.status(200).render('wordle')
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const HighScoreController = async (req, res) => {
    try {
        
        res.status(200).render('HighScore')
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}