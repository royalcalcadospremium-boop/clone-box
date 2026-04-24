-- ============================================================
-- Ninja Box — Storage Buckets e Policies
-- Execute APÓS criar os buckets no Supabase Dashboard
-- ============================================================

-- Cria os buckets (se não existirem via dashboard)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('reference-videos', 'reference-videos', true, 104857600, ARRAY['video/mp4','video/quicktime','video/webm']),
  ('product-images', 'product-images', true, 10485760, ARRAY['image/jpeg','image/png','image/webp']),
  ('generated-videos', 'generated-videos', true, 524288000, ARRAY['video/mp4'])
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- reference-videos: usuário pode enviar para seu prefixo
-- ============================================================

CREATE POLICY "reference_videos_upload" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'reference-videos'
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

CREATE POLICY "reference_videos_select" ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'reference-videos');

CREATE POLICY "reference_videos_delete" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'reference-videos'
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

-- ============================================================
-- product-images: usuário pode enviar para seu prefixo
-- ============================================================

CREATE POLICY "product_images_upload" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images'
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

CREATE POLICY "product_images_select" ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'product-images');

CREATE POLICY "product_images_delete" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images'
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

-- ============================================================
-- generated-videos: somente service_role escreve (via Inngest)
-- Leitura pública
-- ============================================================

CREATE POLICY "generated_videos_select" ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'generated-videos');
