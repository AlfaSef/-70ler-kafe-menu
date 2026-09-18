-- 70'ler Kafe POS — Personel listeleme + kendi profilini güvenli okuma
-- Bu yama mevcut tabloları değiştirmez; yalnızca SECURITY DEFINER RPC'leri ekler.

create or replace function public.list_pos_personnel()
returns setof public.pos_profiles
language sql
security definer
set search_path = public, auth
as $$
  select p.*
  from public.pos_profiles p
  where public.get_my_pos_role() = 'admin'
    and p.role = 'personnel'
  order by p.created_at;
$$;

revoke all on function public.list_pos_personnel() from public;
grant execute on function public.list_pos_personnel() to authenticated;

create or replace function public.get_my_pos_profile()
returns public.pos_profiles
language sql
security definer
set search_path = public, auth
as $$
  select p.*
  from public.pos_profiles p
  where p.user_id = auth.uid()
  limit 1;
$$;

revoke all on function public.get_my_pos_profile() from public;
grant execute on function public.get_my_pos_profile() to authenticated;


-- Personel kaldırma: doğrudan pos_profiles DELETE yerine mevcut güvenli
-- remove_personnel_role() SECURITY DEFINER fonksiyonunu frontend'den çağırabilmek için.
-- Bu işlem personelin POS profilindeki personnel rolünü kaldırır; Auth hesabını silmez.
revoke all on function public.remove_personnel_role(text) from public;
grant execute on function public.remove_personnel_role(text) to authenticated;
