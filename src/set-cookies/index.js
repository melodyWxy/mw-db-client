// 注意如果服务器设置cookie的时候添加了httponly属性
// js将无法获取到cookie
class Cookie {
    // 获取
    get = (key) => {
        let data = this.getAll()
        return data[key]
    }
    // 获取所有
    getAll = () => {
        let cookie = document.cookie
        let obj = {}

        cookie.split(';').map(item => {
            let [key, value] = item.split('=').map(i => decodeURIComponent(i)).map(i => i.trim())
            if (key) {
                obj[key] = value
            }
        })

        return obj
    }
    // 设置 默认使用lingyansi.space这样全局cookie
    // 子域名只能获取子域名、全局域名下的cookie
    set = (key, value, day = 365, domain = '') => {
        let date = Date.now()
        date = date + day * 1000 * 60 * 60 * 24
        let EXPIRES = new Date(date).toUTCString()
        let MAX_AGE = 60 * 60 * 24 * day
        let DOMAINS = []

        if (day < 0 ) {
            // 清空所有 .baidu.com .www.baidu.com ''
            // ''表示当前域名
            // 因为有些服务器设置cookie时并不指定domain
            DOMAINS = ['.' + location.hostname.split('.').slice(-2).join('.'), location.hostname, '']
        } else {
            // 设置cookie在当前域名上
            DOMAINS = [domain]
        }
        if (day === '') {
            EXPIRES = '';
            MAX_AGE = '';
        }
        DOMAINS.forEach(domain => {
            const cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)};domain=${domain};path=/;expires=${EXPIRES};max-age=${MAX_AGE};`
            document.cookie = cookie
        })
    }
    removeAll = () => {
        let obj = this.getAll()
        Object.keys(obj).forEach(key => {
            this.remove(key)
        })
    }
    // 删除cookie，只需调整其expires即可
    remove = (key) => {
        this.set(key, '', -1)
    }
}

//全局实例唯一即可
const cookie = new Cookie();

export default cookie;