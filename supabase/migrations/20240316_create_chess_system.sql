-- Migration: Create Friends and Chess Matches tables
-- Description: Sets up the backend infrastructure for the Chess multiplayer and friends system.

-- 1. Create Friends table
CREATE TABLE IF NOT EXISTS public.friends (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    friend_id UUID REFERENCES auth.users(id) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, friend_id)
);

-- 2. Create Chess Matches table
CREATE TABLE IF NOT EXISTS public.chess_matches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    white_id UUID REFERENCES auth.users(id),
    black_id UUID REFERENCES auth.users(id),
    fen TEXT DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' NOT NULL,
    last_move TEXT,
    status TEXT CHECK (status IN ('waiting', 'active', 'finished')) DEFAULT 'waiting',
    winner_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable RLS
ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chess_matches ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for Friends
CREATE POLICY "Users can see their own friend list" 
ON public.friends FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can insert friend requests" 
ON public.friends FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their received requests" 
ON public.friends FOR UPDATE 
USING (auth.uid() = friend_id OR auth.uid() = user_id);

-- 5. RLS Policies for Chess Matches
CREATE POLICY "Users can see their matches" 
ON public.chess_matches FOR SELECT 
USING (auth.uid() = white_id OR auth.uid() = black_id);

CREATE POLICY "Users can create matches" 
ON public.chess_matches FOR INSERT 
WITH CHECK (auth.uid() = white_id OR auth.uid() = black_id);

CREATE POLICY "Users can update their matches" 
ON public.chess_matches FOR UPDATE 
USING (auth.uid() = white_id OR auth.uid() = black_id);

-- 6. Enable Realtime for chess_matches
ALTER PUBLICATION supabase_realtime ADD TABLE public.chess_matches;
ALTER PUBLICATION supabase_realtime ADD TABLE public.friends;
