import User from "../models/user.js";

export const getUser= async(req,res) => {
    try {

        const { id } = req.params;
        const user= await User.findById(id);
        res.status(200).json(user);

        
    } catch (err) {
        res.status(404).json({message : err.message});
    }
}


export const updateUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const updateFields = req.body;
    
        // Find  user by ID and update
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
        
        console.log(req.body);
        console.log(updatedUser);


        // if (!updatedUser) {
        //   return res.status(404).json({ msg: 'User not found' });
        // }
    
        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(404).json({message : err.message});
    }
}

export const getUserFriends= async (req,res)=>{
    
    try {
        const {id} = req.params;
    const user= await User.findById(id);
    const friends = await Promise.all(
        user.friends.map((id)=>User.findById(id))
    );
    const formattedFriends = friends.map(
        ({_id, userName, firstName, lasrName, email, picturePath})=> {
            return {_id, userName, firstName, lasrName, email, picturePath};
        }
    );

    res.status(200).json(formattedFriends);
        
    } catch (err) {
        res.status(404).json({message : err.message});
    }

}
export const followUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUser = req.user; // Assuming the current user is attached to the request object

        // Check if the user is already following the specified user
        if (currentUser.following.includes(userId)) {
            return res.status(400).json({ message: "User is already being followed" });
        }

        // Add the specified user to the current user's following list
        currentUser.following.push(userId);
        await currentUser.save();

        // Update the specified user's followers list to include the current user
        const followedUser = await User.findById(userId);
        if (!followedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        followedUser.followers.push(currentUser._id);
        await followedUser.save();

        res.status(200).json({ message: "User followed successfully" });
    } catch (err) {
        console.error("Follow user error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUser = req.user; // Assuming the current user is attached to the request object

        // Check if the user is not following the specified user
        if (!currentUser.following.includes(userId)) {
            return res.status(400).json({ message: "User is not being followed" });
        }

        // Remove the specified user from the current user's following list
        currentUser.following = currentUser.following.filter(id => id.toString() !== userId);
        await currentUser.save();

        // Remove the current user from the specified user's followers list
        const followedUser = await User.findById(userId);
        if (!followedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        followedUser.followers = followedUser.followers.filter(id => id.toString() !== currentUser._id.toString());
        await followedUser.save();

        res.status(200).json({ message: "User unfollowed successfully" });
    } catch (err) {
        console.error("Unfollow user error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

