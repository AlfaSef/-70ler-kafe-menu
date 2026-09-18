-- KAMPANYALI MENÜLER alt kategorileri
-- Alt kategoriler products.subcategory alanında kullanılacaktır.
insert into public.categories (name, description, sort_order, is_active)
select 'KAMPANYALI MENÜLER','Avantajlı seçimler',5,true
where not exists (select 1 from public.categories where lower(name)=lower('KAMPANYALI MENÜLER'));


-- Kalori hesaplama modu için ek alanlar
alter table public.products add column if not exists calorie_basis text not null default 'portion';
alter table public.products add column if not exists calorie_per_100g numeric(10,2);
alter table public.products add column if not exists calorie_serving_grams numeric(10,2);


-- PostgREST şema önbelleğini yenile
notify pgrst, 'reload schema';
