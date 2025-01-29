import User from "../models/user.model.js";

// Dodanie/usunięcie produktu z ulubionych
export const toggleFavourite = async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Użytkownik nie znaleziony" });
        }

        const isFavourite = user.favourite.includes(productId);

        if (isFavourite) {
            user.favourite = user.favourite.filter(id => id.toString() !== productId);
        } else {
            user.favourite.push(productId);
        }

        await user.save();
        res.status(200).json({ favourite: user.favourite });
    } catch (error) {
        next(error);
    }
};

// Pobranie ulubionych produktów użytkownika
export const getFavourites = async (req, res, next) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).populate("favourite");

        if (!user) {
            return res.status(404).json({ message: "Użytkownik nie znaleziony" });
        }

        res.status(200).json({ favourite: user.favourite });
    } catch (error) {
        next(error);
    }
};