
export function Input({ placeholder, reference, type }: { placeholder: string, reference?: any , type? : string}) {
    return <div>
        <input ref = {reference}  placeholder={placeholder} type={type} className="w-full px-4 py-2 border-gray-400 border rounded mt-2 mb-2"/>
      </div>   
}//2.51