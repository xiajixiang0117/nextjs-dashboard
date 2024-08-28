'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search(props: { placeholder: string }) {
  // 作为一般规则，如果要从客户端组件读取参数，请使用 useSearchParams() hook，因为这样可以避免返回到服务器。
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function search(term: string) {
    /**
     * ${pathname} 是当前路径，在您的案例中是 "/dashboard/invoices"。
        当用户在搜索栏中键入时，params.toString() 将此输入转换为友好的 URL 格式。
        replace(${pathname}?${params.toString()}) 更新 URL，其中包含用户的搜索数据。例如，如果用户搜索 "Lee"，则为 /dashboard/invoices?query=lee
     */
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={props.placeholder}
        onChange={(event) => { search(event.target.value) }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
