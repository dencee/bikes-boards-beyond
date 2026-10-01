DROP POLICY IF EXISTS "Public insert" ON photos;
DROP POLICY IF EXISTS "Authenticated insert" ON photos;

DROP POLICY IF EXISTS "Public insert" ON comments;
CREATE POLICY "Public insert" ON comments
  FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Public read access" ON storage.objects;
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos');

DROP POLICY IF EXISTS "Public insert access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated insert access" ON storage.objects;
