import {Activity, Cpu, Shuffle} from 'lucide-react'

export const iconForEntropyType = (type: string) => {
	switch (type) {
		case 'physical':
			return <Activity size={18} />
		case 'algorithmic':
			return <Cpu size={18} />
		case 'hybrid':
		default:
			return <Shuffle size={18} />
	}
}
