#include<stdio.h>
#include<math.h>
#include<stdlib.h>

//��Ϸ�������д��word�ĵ� 

//����˼·��1���������߱�ʵ ��2�ҳ�������ͨƬ ��3�ж��ĸ���ͨƬ�Ǳ�Ȧ���� 

struct Node{
	int base;    //ʵɫ 
	int face;    //��ɫ 
	int flag;    // ��ͨƬ�ı�ǣ�1��������һ����ͨƬ���Դ����ƣ� ��ֻ���ڱ����㷨ִ�У������ݲ��ô��� 
};
Node node [10][10];
int Flag[100];   //��i����ͨƬ�Ƿ�������ڵı�ǣ�Ϊ0���� 
int nodeflag_num; //��ͨƬ�����ļ��� 


//----�˴�����������˵�Ļ� ------
/*
���� ���ĸ��߽�ʲô����»����Լ���������һ���������߹���Ȼ�������߱�ʵ��ʱ�� ��˼��һ�¾������ף�
Ȼ����ô�ж��Ƿ��Ǳ���ͨƬ��ֻҪ�ִܵ��ⲿ�Ͳ��ǣ�����ֻҪ���������߽�����Ϊ���Ǳ���ͨƬ�� 
*/ 


void test(int x,int y)              //�ӣ�x��y��������̽����̽������ͨƬ ���нڵ� 
{
	 
	if(node[x][y].base==1)          //�����Լ��ıߣ����� 
	return ;
	if(node[x][y].flag!=0)         //�����ظ�������node.flag�ѱ���������� 
	return ;
	if(x==0||x==9||y==0||y==9)     //�ܵ���߽磬���Ǳ���ͨƬ 
	{
		Flag[nodeflag_num]=1;
		return ;
	}
	node[x][y].flag=nodeflag_num;  
	//������̽�� 
	test(x-1,y);
	test(x+1,y);
	test(x,y-1);
	test(x,y+1);
	return ; 
}
 
int main()
{
	int i ,j;
	int lenth_x,lenth_y;   //��С������Ϸ�����޸ļ��ɣ�ע�⣬�˴��������أ���С���� 
	lenth_x=10;
	lenth_y=10;
	FILE *fp=NULL;
	//��ʼ����ÿ�α�������Ҫִ�У� 
	for(i=0;i<100;i++)
		Flag[i]=0;
	for(i=0;i<lenth_x;i++)
		for(j=0;j<lenth_y;j++)
			node[i][j].flag=0;
	nodeflag_num=1;
	
	
	// ��������base ��face ��������������Ϳʵ��������� 
	fp=fopen("input.txt","r");
	for(i=0;i<lenth_x;i++)
		for(j=0;j<lenth_y;j++)
			fscanf(fp,"%d",&node[i][j].base);
	for(i=0;i<lenth_x;i++)
		for(j=0;j<lenth_y;j++)
		{
			fscanf(fp,"%d",&node[i][j].face);
			if(node[i][j].face==1)
			{
				node[i][j].base=1;
				node[i][j].face=0;
			}
		}
	fclose(fp);		
	
	//�ӵ�һ�����һ�� 
	for(i=1;i<lenth_x-1;i++)          
		for(j=1;j<lenth_y-1;j++)
		{
			if(node[i][j].base==0&&node[i][j].flag==0)//��δͿʵɫ�Ҳ�����֮ǰ�κ���ͨƬ���Ӵ˵���������ͨƬ 
			{
				test(i,j);
				nodeflag_num++;				//��ͨƬ��+1 
			}
		}
	
	/*	
	for(i=0;i<lenth_x;i++)
	{
		for(j=0;j<lenth_y;j++)
			printf("%d\t",node[i][j].flag);
		printf("\n");
	}
	for(i=1;i<nodeflag_num;i++)
		printf("%d %d\n",i,Flag[i]);	
	*/ 
	
	
	//�����б���ͨƬͿʵ 
	for(i=1;i<lenth_x-1;i++)
		for(j=1;j<lenth_y-1;j++)
		{
			if(node[i][j].flag!=0&&Flag[node[i][j].flag]==0)
			{
				node[i][j].base=1;
				node[i][j].face=0;
			}
		}
	
	for(i=0;i<lenth_x;i++)
	{
		for(j=0;j<lenth_y;j++)
			printf("%d\t",node[i][j].base);
		printf("\n");
	}
	return 0;
} 
