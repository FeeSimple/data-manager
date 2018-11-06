export function beautifyCpu(cpuAmount) {
  let cpu = cpuAmount;

  let cnt=0;
  while (cnt < 2 && cpu >= 1000) {
    cpu = cpu/1000;
    cnt++;
  }
  cpu = new Intl.NumberFormat().format(cpu);
  if (cnt == 0) {
    cpu = cpu.toString() + " µs";
  }
  else if (cnt == 1) {
    cpu = cpu.toString() + " ms";
  }
  else if (cnt == 2) {
    cpu = cpu.toString() + " s";
  }

  return cpu;
}

export function beautifyRam(ram) {
  let cnt=0
  while (cnt < 3 && ram >= 1024) {
    ram = ram/1024
    cnt++
  }
  ram = new Intl.NumberFormat().format(ram)
  if (cnt === 0) {
    ram = ram.toString() + " Byte"
  }
  else if (cnt === 1) {
    ram = ram.toString() + " KB"
  }
  else if (cnt === 2) {
    ram = ram.toString() + " MB"
  }
  else if (cnt === 3) {
    ram = ram.toString() + " GB"
  }

  return ram
}

// Applicable for RAM and Bandwidth
export function getResourceStr(resource, cpu) {
  let resourceAvailable = resource.max - resource.used
  let resourceStr = ''
  if (cpu) {
    resourceStr += beautifyCpu(resourceAvailable);
  }
  else {
    resourceStr += beautifyRam(resourceAvailable)
  }
  if (cpu) {
    resourceStr += ' / ' + beautifyCpu(resourceAvailable);
  }
  else {
    resourceStr += ' / ' + beautifyRam(resource.max)
  }
  return resourceStr
}

export function fetchBalanceNumber(balance) {
  let res = ''
  let idx = balance.indexOf(' ') // 100000 XFS
  if (idx != -1) {
    let balanceNum = balance.substring(0, idx);
    return parseFloat(balanceNum)
  } else {
    return null
  }
}

export function beautifyBalance(balance) {
  let res = ''
  let idx = balance.indexOf(' ') // 100000 XFS
  if (idx != -1) {
    let balanceNum = balance.substring(0, idx);
    balanceNum = new Intl.NumberFormat().format(balanceNum).toString()
    res = balanceNum + ' ' + balance.substring(idx);
  } else {
    res = balance
  }
  return res
}
