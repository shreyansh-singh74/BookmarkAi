import { Response } from 'express';
import { Bookmark } from '../models/Bookmark';
import { AuthRequest } from '../middleware/auth.middleware';


export const createBookmark = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, url, description, tags } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!title || !url) {
      res.status(400).json({ error: 'Title and URL are required' });
      return;
    }

    const bookmark = new Bookmark({
      userId,
      title,
      url,
      description,
      tags: tags || [],
    });

    await bookmark.save();

    res.status(201).json({
      message: 'Bookmark created successfully',
      data: bookmark,
    });
  } catch (error) {
    console.error('Create bookmark error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getBookmarks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const bookmarks = await Bookmark.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      message: 'Bookmarks retrieved successfully',
      data: bookmarks,
    });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBookmarkById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const bookmark = await Bookmark.findOne({ _id: id, userId });

    if (!bookmark) {
      res.status(404).json({ error: 'Bookmark not found' });
      return;
    }

    res.status(200).json({
      message: 'Bookmark retrieved successfully',
      data: bookmark,
    });
  } catch (error) {
    console.error('Get bookmark error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBookmark = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, url, description, tags } = req.body;
    const userId = req.user?.userId;

    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: id, userId },
      { title, url, description, tags },
      { new: true, runValidators: true }
    );

    if (!bookmark) {
      res.status(404).json({ error: 'Bookmark not found' });
      return;
    }

    res.status(200).json({
      message: 'Bookmark updated successfully',
      data: bookmark,
    });
  } catch (error) {
    console.error('Update bookmark error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const deleteBookmark = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const bookmark = await Bookmark.findOneAndDelete({ _id: id, userId });

    if (!bookmark) {
      res.status(404).json({ error: 'Bookmark not found' });
      return;
    }

    res.status(200).json({
      message: 'Bookmark deleted successfully',
    });
  } catch (error) {
    console.error('Delete bookmark error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};